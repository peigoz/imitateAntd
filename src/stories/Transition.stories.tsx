import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Transition, { TransitionProps } from '../components/Transition/Transition'
import Button from '../components/Button/Button'
export default {
  title: 'Peigoship/Transition',
  component: Transition,
} as Meta

const TransitionTemplate: Story<TransitionProps> = args => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button
        size='lg'
        onClick={() => {
          setShow(!show)
        }}>
        Toggle Transition
      </Button>
      <Transition in={show} timeout={300} animation='zoom-in-left' {...args}>
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </Transition>
    </>
  )
}
export const DefaultTransition = TransitionTemplate.bind({})
