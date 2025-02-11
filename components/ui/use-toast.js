import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 3000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastTimeouts = new Map()

export function useToast() {
  const [toasts, setToasts] = React.useState([])

  const toast = React.useCallback(
    function ({ title, description, variant, duration = 3000 }) {
      const id = genId()

      setToasts((prevToasts) => {
        if (prevToasts.length >= TOAST_LIMIT) {
          prevToasts.pop()
        }
        return [{ id, title, description, variant }, ...prevToasts]
      })

      const timeoutId = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, duration)

      toastTimeouts.set(id, timeoutId)

      return id
    },
    [setToasts]
  )

  const dismiss = React.useCallback(
    function (toastId) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
      const timeout = toastTimeouts.get(toastId)
      if (timeout) {
        clearTimeout(timeout)
      }
    },
    [setToasts]
  )

  return {
    toast,
    dismiss,
    toasts,
  }
}