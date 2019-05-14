declare module 'cancelable-promise' {
  declare const CancelablePromise: CancelablePromiseConstructor
  interface CancelablePromiseConstructor extends PromiseConstructor {
    readonly prototype: CancelablePromise.CancelablePromise<any>
    new <T>(
      executor: (
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
      ) => void,
    ): CancelablePromise.CancelablePromise<T>
  }
  namespace CancelablePromise {
    interface CancelablePromise<T> extends Promise<T> {
      cancel(errorCallback?: void): void
    }
  }
  export default CancelablePromise
}
