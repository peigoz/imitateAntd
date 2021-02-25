import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DateSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DateSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}
// const handleChange = (keyword: string, data: string[]) => {
//   // return data.filter(item => item.includes(keyword))
//   // return fetch(`url?keyword?=${keyword}`)
// }

const AutoComplete: FC<AutoCompleteProps> = props => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)

  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          if (data.length > 0) {
            setSuggestions(data)
            setShowDropdown(true)
          }
        })
      } else {
        if (results.length > 0) {
          setSuggestions(results)
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestions])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
    // if (value) {
    //   const results = fetchSuggestions(value)
    //   if (results instanceof Promise) {
    //     setLoading(true)
    //     results.then(data => {
    //       setLoading(false)
    //       setSuggestions(data)
    //     })
    //   } else {
    //     setSuggestions(results)
    //   }
    // } else {
    //   setSuggestions([])
    // }
  }
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // console.log(e.key)

    switch (e.key) {
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'Enter':
        if (suggestions) {
          if (highlightIndex === -1) {
            // setHighlightIndex(0)
            // console.log(highlightIndex) //异步，此时还是-1
            handleSelect(suggestions[0])
            return
          }
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    triggerSearch.current = false
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}>
        {loading ? (
          <div className='suggestions-loading-icon'>
            <Icon icon='spinner' spin></Icon>
          </div>
        ) : (
          <ul className='suggestion-list'>
            {suggestions.map((item, index) => {
              const classes = classNames('suggestion-item', {
                'is-active': index === highlightIndex,
              })
              return (
                <li
                  key={index}
                  className={classes}
                  onClick={() => {
                    handleSelect(item)
                  }}>
                  {renderTemplate(item)}
                </li>
              )
            })}
          </ul>
        )}
      </Transition>
    )
  }
  return (
    <div className='auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}></Input>
      {generateDropdown()}
    </div>
  )
}

//TODO: custom options
//TODO: keyboard support
//TODO: debounce
//TODO: click outside

export default AutoComplete
