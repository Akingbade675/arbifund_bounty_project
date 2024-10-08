export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now()
  const remainingDays = difference / (1000 * 3600 * 24)

  return remainingDays.toFixed(0)
}

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal)

  return percentage
}

export const checkIfImage = (url, callback) => {
  const img = new Image()
  img.src = url

  if (img.complete) callback(true)

  img.onload = () => callback(true)
  img.onerror = () => callback(false)
}

export const checkValidDonation = (donation, showSnackBar, setSnackBarMsg) => {
  if (donation <= 0) {
    setSnackBarMsg('Donation amount must be greater than 0')
    showSnackBar(true)
    return
  }

  return ''
}

export const handleSnackbarClose = (callback) => {
  return (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    callback(false)
  }
}

export const formatAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(-6)}`
}
