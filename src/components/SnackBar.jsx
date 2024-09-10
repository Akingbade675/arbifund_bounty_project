import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

const CustomSnackbar = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      message={message}
      autoHideDuration={autoHideDuration}
    />
  )
}

export default CustomSnackbar
