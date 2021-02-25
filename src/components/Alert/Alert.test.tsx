import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import Alert, { AlertProps } from './Alert'

jest.mock('../Icon/Icon', () => {
  return () => {
    return <i className='fa' />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    },
  }
})
const testProps: AlertProps = {
  title: 'test title',
  description: 'test description',
  type: 'danger',
  onClose: jest.fn(),
}
let wrapper: RenderResult, alertElement: HTMLElement
describe('test Alert Component', () => {
  beforeEach(() => {
    wrapper = render(<Alert {...testProps}></Alert>)
  })
  it('should render correct Alert component', () => {
    alertElement = wrapper.getByTestId('test-alert')
    expect(alertElement).toBeInTheDocument()
    expect(alertElement.tagName).toEqual('DIV')
    expect(alertElement).toHaveClass('alert alert-danger')
    // const titleElement = wrapper.getByText('test title')
    // const descElement = wrapper.getByText('test description')
    // expect(titleElement).toBeInTheDocument()
    // expect(descElement).toBeInTheDocument()
    // expect(closeElement).toBeInTheDocument()
    // expect(titleElement.tagName).toEqual('DIV')
    // expect(descElement.tagName).toEqual('DIV')
  })
  it('click close should close Alert and correct call back', async () => {
    const closeElement = wrapper.container.querySelector('.alert.alert-close') as HTMLDivElement
    fireEvent.click(closeElement)
    expect(testProps.onClose).toHaveBeenCalled()
    // await waitFor(() => expect(closeElement).not.toBeVisible())
  })
})
