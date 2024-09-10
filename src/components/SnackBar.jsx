import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

export default function CustomSnackbar({ message }) {
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={setOpen(false)}
      TransitionComponent={SlideTransition}
      message={message}
      key={state.Transition.name}
      autoHideDuration={3000}
    />
  )
}
