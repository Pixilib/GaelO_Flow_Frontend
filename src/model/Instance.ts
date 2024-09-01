import Series from "./Series";

class Instance {
  id: string;
  sopInstanceUID: string|undefined;
  series: Series|undefined;

  constructor(id: string) {
    this.id = id;
  }

  setSeries = (series: Series) => {
    this.series = series;
  };

  toJSON = () => {
    return {
      id: this.id,
      sopInstanceUID: this.sopInstanceUID,
    };
  };
}

export default Instance;
