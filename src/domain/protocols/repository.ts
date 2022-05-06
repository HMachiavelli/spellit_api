export interface Repository {
  create(data: any): any;
  update(data: any): any;
  delete(id: number): any;
  find(options: any): any;
  findById(id: number): any;
}
