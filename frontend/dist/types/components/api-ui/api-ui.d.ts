export declare class ApiUi {
  realm: string;
  id: string;
  key: string;
  uri: string;
  base: string;
  private url;
  isopen: boolean;
  closeIcon: string;
  open(): void;
  close(): void;
  PostData(): void;
  handleChangeRealm(event: any): void;
  handleChangeBase(event: any): void;
  handleChangeId(event: any): void;
  handleChangeKey(event: any): void;
  handleChangeURI(event: any): void;
  render(): any;
}
