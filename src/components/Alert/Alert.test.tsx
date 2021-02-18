import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import Alert, { AlertProps } from './Alert'
const testProps: AlertProps = {
  title: 'test title',
  description: 'test description',
  type: 'danger',
  onClose: jest.fn(),
}
let wrapper: RenderResult,alertElement:HTMLElement, closeElement: HTMLElement
describe('test Alert Component', () => {
  beforeEach(() => {
    wrapper = render(<Alert {...testProps}></Alert>)
    
    alertElement = wrapper.getByTestId('test-alert')
    closeElement = wrapper.getByText('关闭')
  })
  it('should render correct Alert component', () => {
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
  it('click close should close Alert and correct call back', () => {
    fireEvent.click(closeElement)
    expect(testProps.onClose).toHaveBeenCalled()
    expect(alertElement).not.toBeInTheDocument()
  })
})
