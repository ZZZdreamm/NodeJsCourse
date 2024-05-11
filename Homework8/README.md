My project decisions and assumptions (except those specified in the assignment):
- PostgreSQL is used as the database.
- Database stores user information and books information.
- Database class is used to interact with the database.
- Book is database object and BookDTO is used as a data transfer object and to apply business logic like applying discount.
- If user made Order with books, then the books are not available.
- RunManager is used to combine business logic and database interactions (like placing order - instead of reducing cohesion by adding changing state of Book in Database to Order class).
- Order's and Cart's fields are private and accessed through getters and add/remove methods (user will not be allowed to instantly change his cart or order with one click).