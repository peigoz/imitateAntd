import React from 'react'
import { config } from 'react-transition-group'
import AutoComplete, { AutoCompleteProps } from './AutoComplete'
import { fireEvent, render, RenderResult, waitFor, cleanup } from '@testing-library/react'

//使用mock实现transition也可
config.disabled = true
jest.mock('../Icon/Icon', () => {
  return () => {
    return <i className='fa' />
  }
})
const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}
const renderOptionTestProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query))
  },
  renderOption: item => {
    return <div>value:{item.value}</div>
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}
const asyncTestProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    //should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)

    //click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()

    //fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')

    //arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')

    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument())
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...renderOptionTestProps} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => expect(wrapper.queryByText('value:ab')).toBeInTheDocument())
  })
  it('async fetchSuggestions should works fine', async () => {
    cleanup()
    const wrapper = render(<AutoComplete {...asyncTestProps} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    //input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    // await waitFor(() => expect(wrapper.queryByText('a')).toBeInTheDocument())
    // const fetchSuggestions = await waitFor(() => {
    //   wrapper.getByText('a')
    // })
    // expect(fetchSuggestions).toHaveTextContent('A')
  })
})
