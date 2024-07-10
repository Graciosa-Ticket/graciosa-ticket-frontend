export interface ModalActions<T> {
  onOpenChange: (val: boolean) => void;
  data: T;
}
