import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@dts-stn/service-canada-design-system'

export default function PageLink(props) {
  const router = useRouter()
  return (
    <>
      <div className="pt-2 md:pt-4 my-8 border-t border-gray-light ">
        <h2 className="font-display font-bold text-[32px] md:text-[36px]">
          {props.lookingForText}
        </h2>
        <div className="font-body mb-10  text-xl">
          <span className=" text-gray-darker" id={`link-for-${props.linkText}`}>
            {props.accessText}{' '}
          </span>
          <Link href={props.href}>
            <a className="text-blue-default hover:text-blue-hover visited:text-purple-medium underline">
              {props.linkText}
            </a>
          </Link>
        </div>

        <Button
          id={props.buttonId}
          onClick={() => router.push('/home')}
          styling={props.styling}
          text={props.buttonText}
        />
      </div>
    </>
  )
}

PageLink.propTypes = {
  // Props for the text and link
  lookingForText: PropTypes.string,
  linkText: PropTypes.string,
  accessText: PropTypes.string,
  href: PropTypes.string,
  // Props for the Button
  id: PropTypes.string,
  buttonId: PropTypes.string,
  styling: PropTypes.string,
  buttonText: PropTypes.string,
}

//   use on Profile page
// import PageLink from '../components/PageLink'
//   <PageLink
//   lookingForText={t.pageLinkSecurity}
//   accessText={t.accessYourSecurityText}
//   linkText={t.securityLinkText}
//   href="/security"
//   id="link-id"
//   buttonId="button-back"
//   styling="secondary"
//   buttonText={t.backToDashboard}
// ></PageLink>

//use on security page
//   <PageLink
//   lookingForText={t.pageLinkProfile}
//   accessText={t.accessYourProfileText}
//   linkText={t.profileLinkText}
//   href="/profile"
//   id="link-id"
//   buttonId="button-back"
//   styling="secondary"
//   buttonText={t.backToDashboard}
// ></PageLink>
