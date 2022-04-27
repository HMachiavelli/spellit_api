export default (err: any, req: any, res: any, next: any) => {
  console.log("middleware: ", err);
  next();
};
