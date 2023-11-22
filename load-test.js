// k6 Documentation: https://k6.io/docs/

import { check, sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  vus: 300,
  duration: '5m',
  thresholds: {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<1000'], // 95% of requests should be below 300ms
    'group_duration{group:::Next_Template}': ['avg < 200'], // average duration cannot be longer than 200ms
  },
}

export default function main() {
  let response
  const base = __ENV.K6_BASE_URL
  const session_name = __ENV.K6_SESSION_TOKEN // FIXME: this can be made dynamic

  group('Secure-Client-Hub', function () {
    response = http.get(base, {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
      },
    })
    // console.log(base);
    const jar = http.cookieJar()
    let cookies = jar.cookiesForURL(base)
    let res = http.get(base + '/en/my-dashboard')
    check(res, {
      'status 200 initial': (r) => r.status === 200,
      'initially does not have session cookie': (r) =>
        cookies[session_name] === undefined,
      'Redirected to signin': (r) =>
        r.body.includes('Sign in with Credentials'),
    })

    res = http.get(base + '/api/auth/signin')

    res = res.submitForm({
      formSelector: 'form',
      fields: { username: 'test1', password: 'password1' },
    })

    res = http.get(base)

    // const jar = http.cookieJar();
    cookies = jar.cookiesForURL(base)
    check(res, {
      'status 200 authenticated': (r) => r.status === 200,
      'has session cookie': (r) => cookies[session_name].length > 0,
    })

    res = http.get(base + '/en/my-dashboard')
    check(res, {
      'status 200 homepage': (r) => r.status === 200,
      'Verify homepage text': (r) => r.body.includes('Employment Insurance'),
    })

    jar.clear(base)
    cookies = jar.cookiesForURL(base)

    res = http.get(base + '/en/my-dashboard')
    cookies = jar.cookiesForURL(base)

    check(res, {
      'status 200 cleared cookies': (r) => r.status === 200,
      'does not have cookie session': (r) =>
        cookies[session_name] === undefined,
      'Back to signin': (r) => r.body.includes('Sign in with Credentials'),
    })
  })

  // Automatically added sleep
  sleep(1)
}
