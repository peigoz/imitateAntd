import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import AutoComplete, { AutoCompleteProps } from '../components/AutoComplete/AutoComplete'

export default {
  title: 'Peigoship/AutoComplete',
  component: AutoComplete,
  parameters: {
    actions: {
      handles: ['onSelect'],
    },
  },
} as Meta

// interface GithubUserProps {
//   login: string
//   url: string
//   avatar_url: string
// }
// const lakersWithNumber = [
//   { value: 'bradley', number: 11 },
//   { value: 'pope', number: 1 },
//   { value: 'caruso', number: 4 },
//   { value: 'cook', number: 2 },
//   { value: 'cousins', number: 15 },
//   { value: 'james', number: 23 },
//   { value: 'AD', number: 3 },
//   { value: 'green', number: 14 },
//   { value: 'howard', number: 39 },
// ]
// const handleFetch = (query: string) => {
//   return lakersWithNumber.filter(player => player.value.includes(query))
// }
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    })
}
// const renderOption = (item: DataSourceType) => {
//   const itemWithGithub = item as DataSourceType<GithubUserProps>
//   return (
//     <>
//       <h2>Name: {itemWithGithub.value}</h2>
//       <p>url: {itemWithGithub.url}</p>
//     </>
//   )
// }

const AutoCompleteTemplate: Story<AutoCompleteProps> = args => {
  delete args.onChange
  // console.log(args)
  return <AutoComplete {...args} fetchSuggestions={handleFetch}></AutoComplete>
}
export const GithubAutoComplete = AutoCompleteTemplate.bind({})
