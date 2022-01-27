import { get_boxes_info } from "./Queries/get_boxes_info";
import { get_fusions_info } from "./Queries/get_fusions_info";


const resolvers = {
    Query: {
        get_boxes_info,
        get_fusions_info
    }
};
export { resolvers };
