# 学习Antd部分源码，React+Ts+Jest的项目

## 安装教程
1. npm install peigoship

## 使用教程
```React
  import { Button } from 'peigoship'
  
  const App: React.FC = () => {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello man',
  }
  useEffect(() => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData).then(res => {
      console.log(res.data)
      setTitle(res.data.title)
    })
  })
  return (
    <div className='App'>
      <p> {title} </p>
      <Button btnType='primary' size='lg' onSetTitle = { () => setTitle('Hello,World!')}>A Large Button To SetTitle</Button>
    </div>
  )
}
export default App

```
