import {
    Alert,
    AlertIcon,
  } from "@chakra-ui/react"

  export default function BoxAlert({ type = 'warning', text }) {

    return (
        <Alert status={type}>
            <AlertIcon />
            {text}
        </Alert>
    )
  }