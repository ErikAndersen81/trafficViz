import React from "react";

const GraphOptions = (props: any) => {
  const meanChecked = props.graphOptions.indexOf("mean") > -1;
  const medianChecked = props.graphOptions.indexOf("median") > -1;
  const aggregatedChecked = props.graphOptions.indexOf("aggregated") > -1;
  const change = (event: any) => {
    if (event.target.checked) {
      let dts = props.graphOptions.concat([event.target.value]);
      props.setGraphOptions(dts);
    } else {
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
      let dts = props.graphOptions.filter((x) => x !== event.target.value);
      props.setGraphOptions(dts);
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

      <input
        type="checkbox"
        id="aggregated"
        name="aggregated"
        value="aggregated"
        defaultChecked={aggregatedChecked}
      />

      <label htmlFor="aggregated">Aggregated </label>
    </form>
  );
};

export default GraphOptions;
