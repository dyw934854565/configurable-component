/** Options used in DataDialog */
export interface DataDialogOptions {
  /** onValidate function */
  onValidate: Function

  /** forms Array */
  forms: any[]

  /** key */
  key?: string

  /** Custom class name for Message */
  formExtra?: Object

  /** msgBox */
  msgBox?: Object
}

declare module 'vue/types/vue' {
  interface Vue {
  /** dataDialog edit or new data. */
    $dataDialog: (options: DataDialogOptions) => Promise<any>
  }
}