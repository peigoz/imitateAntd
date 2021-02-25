import React from 'react'
import axios from 'axios'
import { fireEvent, render, RenderResult, waitFor, createEvent } from '@testing-library/react'
import Upload, { UploadProps } from './Upload'
jest.mock('../Icon/Icon', () => {
  //将icon图标以文字形式显示出来
  return ({ icon, onClick }: any) => {
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
  action: 'fakeUrl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test should component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'cool' })
    // })
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    //触发上传过程
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })
  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    const mockDropEvent = createEvent.drop(uploadArea)

    //失败，需要自定义事件
    // fireEvent.dragOver(uploadArea, { dataTransfer: { files: [testFile] } })
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea, mockDropEvent)
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })
})
