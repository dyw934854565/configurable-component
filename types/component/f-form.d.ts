import {Form} from 'element-ui'

export interface FFormOption {
    key: String
    label: String
    type?: String,
    extra: Object
}
export type FFormOptions = FFormOption[]

export type FFormForms = FFormOptions | ((model: Object) => FFormOptions)
export declare class FForm extends Form {
  model: Object
  filter: (form: FFormOption) => Boolean
  forms: FFormForms
}
