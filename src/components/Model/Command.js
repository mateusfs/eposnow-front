export class ProductCommand {
    id = 0;
    name = "";
    price = 0;
}

export class Table {
    id = 0;
    name = "";
}

export class Command {
    id = 0;
    status = 0;
    name = "";
    table = new Table();
    customers = 0;
    products = [];
}

