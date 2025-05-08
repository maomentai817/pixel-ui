import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { withInstall } from '@pixel-ui/utils'

export const PxDropdown = withInstall(Dropdown)
export const PxDropdownItem = withInstall(DropdownItem)
export * from './types.dropdown'
export * from './types.dropdownItem'
