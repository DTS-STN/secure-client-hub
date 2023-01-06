import renderer from 'react-test-renderer'
import SignedOut from '../../../components/sessionModals/SignedOut'

it('renders correctly', () => {
  const signedOutRender = renderer
    .create(
      <SignedOut
        closeModal={() => console.log('Close Modal')}
        onContinue={() => console.log('Continue Clicked')}
        id="SignedOut"
      />
    )
    .toJSON()
  expect(signedOutRender).toMatchSnapshot()
})
