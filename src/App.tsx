import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Alert from './components/Alert/Alert'
import Tabs from './components/Tabs/Tabs'
import TabItem from './components/Tabs/TabItem'
import Icon from './components/Icon/Icon'
import Transition from './components/Transition/Transition'
library.add(fas)

const App: React.FC = () => {
  // const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  useEffect(() => {})
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Hello World</h1>
        <h2>Hello Menu</h2>
        <Button
          size={ButtonSize.Large}
          onClick={() => {
            setShow(!show)
          }}>
          Toggle Transition
        </Button>
        <Transition in={show} timeout={300} animation='zoom-in-left'>
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
        <Transition in={show} timeout={300} animation='zoom-in-left' wrapper>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
            A Large Button
          </Button>
        </Transition>
        <hr />
        <Icon icon='coffee' theme='primary' size='3x'></Icon>
        {/* <hr />
        <FontAwesomeIcon icon={faCoffee} size='lg' /> */}
        <hr />
        <Menu
          defaultIndex='0'
          defaultOpenSubMenus={['3']}
          // mode='vertical'
          onSelect={index => {
            alert(index)
          }}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <MenuItem>cool link3</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link4</MenuItem>
        </Menu>
        <h3>Hello Button</h3>
        <hr />
        <code>const a = 'b'</code>
        <br />
        <Button disabled>Hello</Button>
        <br />
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <br />
        <Button btnType={ButtonType.Link} href='http://www.baidu.com'>
          Baidu Link
        </Button>
        <hr />
        <Alert description='你好,世界'></Alert>
        <hr />
        <Tabs defaultIndex={0} type='card'>
          <TabItem label='选项卡一'>this is content one</TabItem>
          <TabItem label='选项卡二'>this is content two</TabItem>
          <TabItem label='用户管理' disabled>this is content three</TabItem>
        </Tabs>
      </header>
    </div>
  )
}
export default App
