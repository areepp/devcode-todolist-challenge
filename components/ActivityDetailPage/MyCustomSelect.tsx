import { components } from 'react-select'
import PriorityColor from './PriorityColor'

export const MyMenuList = (props: any) => {
  const { MenuList } = components

  return (
    <MenuList {...props}>
      <div data-cy="modal-add-priority-item">{props.children}</div>
    </MenuList>
  )
}

export const MyControl = (props: any) => {
  const { Control } = components
  const { value } = props.getValue()[0]

  return (
    <Control {...props}>
      <PriorityColor className="ml-3" priority={value} />
      {props.children}
    </Control>
  )
}

export const MyOption = (props: any) => {
  const { Option } = components
  const { value } = props.data
  return (
    <Option {...props}>
      <div
        className="flex items-center gap-2"
        data-cy={`modal-add-priority-${
          value === 'normal' ? 'medium' : 'value'
        }`}
      >
        <PriorityColor priority={value} />
        <span>{props.data.label}</span>
      </div>
    </Option>
  )
}
