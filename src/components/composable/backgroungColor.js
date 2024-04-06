import { computed } from "vue";

function useBackgroundColor(props){
    return computed(()=>{
        const options = {
          danger: "var(--danger-color)",
          info: "var(--info-color)",
          warning: "var(--warning-color)",
          success: "var(--accent-color)",
          secondary: "var(--secondary-color)",
        }
        return options[props.type];
      });
}
const backgroungColorProps={
    type: {
        default: "success",
        validator(value) {
          return ["danger", "warning", "info", "success", "secondary"].includes(value);
        },
      },
}
export {useBackgroundColor, backgroungColorProps};
