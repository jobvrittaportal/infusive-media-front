import React from 'react'
import {Button} from '@chakra-ui/react'
type Props = {
  variant?: string
  className?: string
  leftIcon?: any
  rightIcon?: any
  size?: string
  onClick?: () => void
  isDisabled?: boolean
  type?: any
  isLoading?: boolean
  title?: any
  ref?:any
}
export default function CustomButton(props: Props) {
  return (
    <div>
      <Button
        variant={props.variant}
        className={props.className}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        size={props.size}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
        type={props.type}
        isLoading={props.isLoading}
        ref={props.ref}
      >
        {props.title}
      </Button>
    </div>
  )
}
