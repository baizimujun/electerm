
import { BookmarkForm } from '../bookmark-form'
import {
  Form, Button, Input, InputNumber,
  message
} from 'antd'
import { validateFieldsAndScroll } from '../../common/dec-validate-and-scroll'
import {
  defaultUserName
} from '../../common/constants'
import { formItemLayout, tailFormItemLayout } from '../../common/form-layout'
import InputAutoFocus from '../common/input-auto-focus'

const FormItem = Form.Item
const { prefix } = window
const e = prefix('form')
const s = prefix('setting')
const t = prefix('terminalTheme')

@Form.create()
@validateFieldsAndScroll
class JumpHostForm extends BookmarkForm {
  handleSubmit = async (e, saveOnly = false) => {
    e.preventDefault()
    let res = await this.validateFieldsAndScroll()
    if (!res) return
    // let { formData } = this.props
    // let {
    //   themeName,
    //   themeText
    // } = res
    // let update = {
    //   name: themeName,
    //   themeConfig: convertTheme(themeText).themeConfig
    // }
    // let update1 = {
    //   ...update,
    //   id: generate()
    // }
    // if (formData.id) {
    //   this.props.store.editTheme(formData.id, update)
    // } else {
    //   this.props.store.addTheme(update1)
    //   this.props.store.modifier({
    //     item: update1
    //   })
    // }
    // if (!saveOnly) {
    //   this.props.store.setTheme(
    //     formData.id || update1.id
    //   )
    // }
    message.success(s('saved'))
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      host,
      port,
      name,
      id,
      username
    } = this.props.formData
    let { autofocustrigger } = this.props.store
    return (
      <Form onSubmit={this.handleSubmit} className='form-wrap'>
        {this.renderTitle(id)}
        <FormItem
          {...formItemLayout}
          label={e('host')}
          hasFeedback
        >
          {getFieldDecorator('host', {
            rules: [{
              max: 130, message: '130 chars max'
            }, {
              required: true, message: 'host required'
            }],
            initialValue: host
          })(
            <InputAutoFocus
              autofocustrigger={autofocustrigger}
              selectall='true'
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={e('username')}
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{
              max: 30, message: '30 chars max'
            }, {
              required: true, message: 'username required'
            }],
            initialValue: username
          })(
            <Input placeholder={defaultUserName} />
          )}
        </FormItem>
        {this.renderAuth()}
        <FormItem
          {...formItemLayout}
          label={e('port')}
          hasFeedback
        >
          {getFieldDecorator('port', {
            rules: [{
              required: true, message: 'port required'
            }],
            initialValue: port
          })(
            <InputNumber
              placeholder={e('port')}
              min={1}
              max={65535}
              step={1}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={e('name')}
          hasFeedback
        >
          {getFieldDecorator('name', {
            initialValue: name
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <p>
            <Button
              type='primary'
              htmlType='submit'
              className='mg1r'
            >{t('saveAndApply')}</Button>
            <Button
              type='ghost'
              onClick={e => this.handleSubmit(e, true)}
            >{e('save')}</Button>
          </p>
        </FormItem>
      </Form>
    )
  }
}

export default JumpHostForm
