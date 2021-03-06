## Setup in Local Machine

1. Clone the project to your local machine
2. Go inside the project and run `npm install` to install all packages used by the app
3. Go inside the project and run `npm run start-json-server` to start JSON server.
4. If you are running Window then `npm run start-pc` to start server.
5. If you are running mac or linux `npm run start` to start server.

### TASKS

### 1. KENDO SLIDER

In Pre-defined React [Kendo Slider](https://www.telerik.com/kendo-react-ui/components/inputs/slider/) , Customize this pre-defined slider and implement an input box which accepts integer value between 0 to 1, and if you change the input value the slider should change its pointer as per input value
and if the slider is changed from slider pointer the value in input should change accordingly.
The final result should look like attached gif file.

To check slider configuration, Please check over src --> Slider

### 2. TABLE CRUD OPERATION

By using JSON Server Mock API implement a CRUD operation of products (id, product_name, category_name, description, created_at, created_by, status).
Use any frontend UI framework and React to implement this function.
You need to have popup model for adding/updating product, pop up confirmation dialogue for deleting product. Also it would be nice to have data table implementation for client-side sorting, searching and pagination.
