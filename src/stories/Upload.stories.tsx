import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Upload, { UploadProps, UploadFile } from '../components/Upload/Upload'
import Icon from '../components/Icon/Icon'

export default {
  title: 'Peigoship/Upload',
  component: Upload,
  parameters: {
    actions: {
      handles: ['onProgress', 'onSuccess', 'onError'],
    },
  },
} as Meta

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     //大于50kb
//     alert('file too big')
//     return false
//   }
//   return true
// }
const filePromise = (file: File) => {
  //重命名newName
  const newFile = new File([file], 'newName', { type: file.type })
  return Promise.resolve(newFile)
}
const UploadTemplate: Story<UploadProps> = args => {
  return (
    <Upload
      {...args}
      // action='https://jsonplaceholder.typicode.com/posts/'
      // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      action='https://run.mocky.io/v3/8394e3d0-243f-4bb4-abee-36aea502cc6a'
      name='fileName'
      multiple
      drag
      defaultFileList={defaultFileList}
      onChange={filePromise}>
      <Icon icon='upload' size='5x' theme='secondary' />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  )
}
export const DefaultUpload = UploadTemplate.bind({})
