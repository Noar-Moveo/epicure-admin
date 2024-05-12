export interface IDeleteProps {
    item: {
      _id: string;
    };
    deleteDataCallback: (id: string) => Promise<void>;
  }
  
  