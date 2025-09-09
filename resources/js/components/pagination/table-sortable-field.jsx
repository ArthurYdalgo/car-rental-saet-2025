import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import CircleNumber from "../circle-number";
import { Badge } from "../ui/badge";

const TableSortableField = ({handleClick, field, sortBy = [], className, children, ...props}) => {
    
    const isSortable = 1;
    const isAnySortingBeingMade = sortBy.length > 0;
    const defaultSortByValue = 0;
    const isFieldBeingSorted = sortBy.find(sort => sort.field == field) ?? false;
    const position = isFieldBeingSorted ? sortBy.findIndex(sort => sort.field == field) : null;
    const value = !isAnySortingBeingMade ? defaultSortByValue : (sortBy.find(sort => sort.field == field)?.value ?? 0);

    const newValue = () => {
        switch (value) {
            case 1:
                return 0;
            case -1:
                return 1;
            default:
                return -1;
        }
    }

    const handleToggle = (e) => {
        handleClick(field, newValue());
    }

    return (isSortable ? <div props={props} onClick={handleToggle} className={className ?? "flex hover:cursor-pointer items-center"}>
        <span className="whitespace-nowrap mr-1">{children}</span>
        {value == 0 && <ArrowUpDown />}
        {value == 1 && <ArrowUp />}
        {value == -1 && <ArrowDown />}
        <div className="w-full flex prevent-select">
        {isFieldBeingSorted && <Badge className="ml-1" variant={value == 1 ? 'green' : 'yellow'}>{position+1}</Badge>}
        </div>
    </div> : <span className="whitespace-nowrap">{children}</span>);
}

export default TableSortableField;