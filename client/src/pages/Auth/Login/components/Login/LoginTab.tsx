// Antd dependencies
import { Tabs } from 'antd'
import { TabPaneProps } from 'antd/es/tabs'

// Other dependencies
import React, { Component } from 'react'

// Local files
import LoginContext, { LoginContextProps } from './LoginContext'

const generateId = ((): ((prefix?: any) => any) => {
	let i = 0
	return (prefix = ''): string => {
		i += 1
		return `${prefix}${i}`
	}
})()

declare interface LoginTabProps extends TabPaneProps {
	tabUtil: LoginContextProps['tabUtil']
}

class LoginTab extends Component<LoginTabProps> {
	uniqueId = ''

	constructor(props: LoginTabProps) {
		super(props)
		this.uniqueId = generateId('login-tab-')
	}

	componentDidMount(): void {
		const { tabUtil } = this.props
		if (tabUtil) {
			tabUtil.addTab(this.uniqueId)
		}
	}

	render(): JSX.Element {
		const { children } = this.props
		return <Tabs.TabPane {...this.props}>{children}</Tabs.TabPane>
	}
}

const WrapContext: React.FC<TabPaneProps> & {
	typeName: string
} = props => (
	<LoginContext.Consumer>{(value): JSX.Element => <LoginTab tabUtil={value.tabUtil} {...props} />}</LoginContext.Consumer>
)

WrapContext.typeName = 'LoginTab'

export default WrapContext
