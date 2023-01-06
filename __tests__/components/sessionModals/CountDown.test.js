import renderer from 'react-test-renderer'
import CountDown from '../../../components/sessionModals/CountDown'

it('renders correctly', () => {
  const countDownRender = renderer
    .create(
      <CountDown
        closeModal={() => console.log('Close Modal')}
        onSignOut={() => console.log('Sign Out Clicked')}
        onStay={() => console.log('Stay Signed In Clicked')}
        id="CountDown"
        deadline="January, 31, 2023"
      />
    )
    .toJSON()
  expect(countDownRender).toMatchSnapshot()
})
