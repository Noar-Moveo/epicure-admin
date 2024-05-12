export interface IRestoreProps {
    item: {
      _id: string;
    };
   restoreDataCallback: (id: string) => Promise<void>;
  }
  
  