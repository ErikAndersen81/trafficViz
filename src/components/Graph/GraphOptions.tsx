import React from "react";

type GraphOptionsProps = {
  graphOptions: Array<string>;
  setGraphOptions: any;
};

const GraphOptions = (props: GraphOptionsProps) => {
  const { graphOptions, setGraphOptions } = { ...props };
  const meanChecked = graphOptions.indexOf("mean") > -1;
  const medianChecked = graphOptions.indexOf("median") > -1;
  const change = (event: any) => {
    if (event.target.checked) {
      let dts = graphOptions.concat([event.target.value]);
      setGraphOptions(dts);
    } else {
      let dts = graphOptions.filter((x) => x !== event.target.value);
      setGraphOptions(dts);
    }
  };
  return (
    <form onChange={change}>
      <input
        type="checkbox"
        id="mean"
        name="mean"
        value="mean"
        defaultChecked={meanChecked}
      />

      <label htmlFor="mean">Mean </label>

      <input
        type="checkbox"
        id="median"
        name="median"
        value="median"
        defaultChecked={medianChecked}
      />

      <label htmlFor="median">Median </label>

    </form>
  );
};

export default GraphOptions;
