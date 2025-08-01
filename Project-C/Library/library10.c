#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <conio.h> // For getch()
#include <ctype.h> // For isdigit(), tolower()

// --- Constants ---
#define MAX_BOOKS 100
#define MAX_USERS 50
#define MAX_NAME 50
#define MAX_TITLE 100
#define BOOKS_FILE "books.dat"
#define USERS_FILE "users.dat"

// --- Data Structures ---
struct Book {
    int id;
    char title[MAX_TITLE];
    char author[MAX_NAME];
    int is_borrowed;
    char borrower[MAX_NAME];
};

struct User {
    char username[MAX_NAME];
    char password_hash[MAX_NAME]; // Store hash instead of plain text
    int is_admin;
};

// --- Global Variables ---
struct Book books[MAX_BOOKS];
struct User users[MAX_USERS];
int book_count = 0;
int user_count = 0;
int current_user_index = -1; // Index of the logged-in user

// --- Function Prototypes ---

// Core Data Functions
void save_all_data();
void load_all_data();
void create_default_admin();

// Utility Functions
void clear_screen();
void press_any_key_to_continue();
void get_safe_input(char *buffer, int size);
void get_hidden_password(char *password, int max_length);
void simple_hash(const char *input, char *output); // Simple hashing for passwords
char* to_lower_case(char* str); // Helper for case-insensitive search

// Menu & UI Functions
void display_main_menu();
void admin_menu();
void student_menu();

// User & Auth Functions
int login(int is_admin_login);
void create_student_account();

// Book Management Functions
void add_book();
void delete_book();
void search_book();
void borrow_book();
void return_book();
void display_library_status();
void display_books_by_status_menu();
void print_book_header();
void print_book_details(const struct Book* book);


// --- Main Function ---
int main() {
    load_all_data();
    create_default_admin(); // Create admin if no users exist
    display_main_menu();
    save_all_data(); // Save all changes once before exiting
    printf("\nAll data saved. Thank you for using the library system!\n");
    return 0;
}

// --- Function Implementations ---

// --- Core Data Functions ---

void save_all_data() {
    FILE *book_file = fopen(BOOKS_FILE, "wb");
    if (book_file == NULL) {
        perror("Error saving books file");
        return;
    }
    fwrite(&book_count, sizeof(int), 1, book_file);
    fwrite(books, sizeof(struct Book), book_count, book_file);
    fclose(book_file);

    FILE *user_file = fopen(USERS_FILE, "wb");
    if (user_file == NULL) {
        perror("Error saving users file");
        return;
    }
    fwrite(&user_count, sizeof(int), 1, user_file);
    fwrite(users, sizeof(struct User), user_count, user_file);
    fclose(user_file);
}

void load_all_data() {
    FILE *book_file = fopen(BOOKS_FILE, "rb");
    if (book_file != NULL) {
        fread(&book_count, sizeof(int), 1, book_file);
        fread(books, sizeof(struct Book), book_count, book_file);
        fclose(book_file);
    }

    FILE *user_file = fopen(USERS_FILE, "rb");
    if (user_file != NULL) {
        fread(&user_count, sizeof(int), 1, user_file);
        fread(users, sizeof(struct User), user_count, user_file);
        fclose(user_file);
    }
}

void create_default_admin() {
    if (user_count == 0) {
        printf("No users found. Creating default admin account...\n");
        printf("Username: admin\nPassword: admin\n");
        strcpy(users[0].username, "admin");
        simple_hash("admin", users[0].password_hash);
        users[0].is_admin = 1;
        user_count = 1;
        press_any_key_to_continue();
    }
}

// --- Utility Functions ---

void clear_screen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void press_any_key_to_continue() {
    printf("\nPress any key to continue...");
    getch();
}

void get_safe_input(char *buffer, int size) {
    fgets(buffer, size, stdin);
    buffer[strcspn(buffer, "\n")] = '\0'; // Remove trailing newline
}

void get_hidden_password(char *password, int max_length) {
    int i = 0;
    char ch;
    while (1) {
        ch = getch();
        if (ch == '\r' || ch == '\n') { // Enter key
            password[i] = '\0';
            break;
        } else if (ch == '\b' && i > 0) { // Backspace
            i--;
            printf("\b \b");
        } else if (ch != '\b' && i < max_length - 1) {
            password[i++] = ch;
            printf("*");
        }
    }
    printf("\n");
}

void simple_hash(const char *input, char *output) {
    unsigned long hash = 5381;
    int c;
    while ((c = *input++)) {
        hash = ((hash << 5) + hash) + c; // hash * 33 + c
    }
    sprintf(output, "%lu", hash);
}

// Helper function to convert string to lowercase
char* to_lower_case(char* str) {
    for (char *p = str; *p; p++) {
        *p = tolower(*p);
    }
    return str;
}

// --- Menu & UI Functions ---

void display_main_menu() {
    const char *options[] = {"Log in as Admin", "Log in as Student", "Create Student Account", "Exit"};
    int num_options = 4;
    int selected = 0; // الخيار الأول محدد افتراضياً
    int ch;

    while (1) {
        clear_screen();
        printf("\n\n   ***************************************\n");
        printf("   *                                     *\n");
        printf("   *     Welcome to The Library System   *\n");
        printf("   *                                     *\n");
        printf("   ***************************************\n\n");
        printf("   Use UP/DOWN arrows to navigate, ENTER to select.\n\n");

        for (int i = 0; i < num_options; i++) {
            if (i == selected) {
                printf("   > \033[7m%s\033[0m\n", options[i]); // Highlight selected item
            } else {
                printf("     %s\n", options[i]);
            }
        }

        ch = getch();
        if (ch == 0 || ch == 224) { // Arrow key prefix
            switch (getch()) {
                case 72: // Up arrow
                    if (selected > 0) selected--;
                    else selected = num_options - 1; // Wrap around
                    break;
                case 80: // Down arrow
                    if (selected < num_options - 1) selected++;
                    else selected = 0; // Wrap around
                    break;
            }
        } else if (ch == 13) { // Enter key
            switch (selected) {
                case 0: if (login(1)) admin_menu(); break;
                case 1: if (login(0)) student_menu(); break;
                case 2: create_student_account(); break;
                case 3: return; // Exit
            }
        }
    }
}

void admin_menu() {
    const char *options[] = {"Add Book", "Delete Book", "Search Book", "View Library Status", "Logout"};
    int num_options = 5;
    int selected = 0;
    int ch;

    while (1) {
        clear_screen();
        printf("\n--- Admin Menu ---\n");
        printf("Use UP/DOWN arrows to navigate, ENTER to select.\n\n");

        for (int i = 0; i < num_options; i++) {
            if (i == selected) {
                printf(" > \033[7m%s\033[0m\n", options[i]);
            } else {
                printf("   %s\n", options[i]);
            }
        }

        ch = getch();
        if (ch == 0 || ch == 224) {
            switch (getch()) {
                case 72: if (selected > 0) selected--; else selected = num_options - 1; break;
                case 80: if (selected < num_options - 1) selected++; else selected = 0; break;
            }
        } else if (ch == 13) {
            switch (selected) {
                case 0: add_book(); break;
                case 1: delete_book(); break;
                case 2: search_book(); break;
                case 3: display_library_status(); break;
                case 4: current_user_index = -1; return; // Logout
            }
        }
    }
}

void student_menu() {
    const char *options[] = {"Search for a Book", "Borrow a Book", "Return a Book", "View Books (Filter)", "Logout"};
    int num_options = 5;
    int selected = 0;
    int ch;

    while (1) {
        clear_screen();
        printf("\n--- Student Menu ---\n");
        printf("Welcome, %s!\n\n", users[current_user_index].username);
        printf("Use UP/DOWN arrows to navigate, ENTER to select.\n\n");

        for (int i = 0; i < num_options; i++) {
            if (i == selected) {
                printf(" > \033[7m%s\033[0m\n", options[i]);
            } else {
                printf("   %s\n", options[i]);
            }
        }

        ch = getch();
        if (ch == 0 || ch == 224) {
            switch (getch()) {
                case 72: if (selected > 0) selected--; else selected = num_options - 1; break;
                case 80: if (selected < num_options - 1) selected++; else selected = 0; break;
            }
        } else if (ch == 13) {
            switch (selected) {
                case 0: search_book(); break;
                case 1: borrow_book(); break;
                case 2: return_book(); break;
                case 3: display_books_by_status_menu(); break;
                case 4: current_user_index = -1; return; // Logout
            }
        }
    }
}

// --- User & Auth Functions ---

int login(int is_admin_login) {
    clear_screen();
    char username[MAX_NAME], password[MAX_NAME], password_h[MAX_NAME];
    const char* role = is_admin_login ? "Admin" : "Student";

    printf("\n--- %s Login ---\n", role);
    printf("Enter username: ");
    get_safe_input(username, MAX_NAME);
    printf("Enter password: ");
    get_hidden_password(password, MAX_NAME);
    simple_hash(password, password_h);

    for (int i = 0; i < user_count; i++) {
        if (strcmp(users[i].username, username) == 0 &&
            strcmp(users[i].password_hash, password_h) == 0 &&
            users[i].is_admin == is_admin_login) {
            current_user_index = i;
            printf("\nLogin successful!\n");
            press_any_key_to_continue();
            return 1;
        }
    }
    printf("\nInvalid credentials or incorrect role!\n");
    press_any_key_to_continue();
    return 0;
}

void create_student_account() {
    clear_screen();
    if (user_count >= MAX_USERS) {
        printf("\nUser limit reached! Cannot create new accounts.\n");
        press_any_key_to_continue();
        return;
    }

    printf("\n--- Create Student Account ---\n");
    printf("Enter new username: ");
    get_safe_input(users[user_count].username, MAX_NAME);

    for (int i = 0; i < user_count; i++) {
        if (strcmp(users[i].username, users[user_count].username) == 0) {
            printf("\nUsername already exists!\n");
            press_any_key_to_continue();
            return;
        }
    }

    char password[MAX_NAME], confirm_password[MAX_NAME];
    printf("Enter password: ");
    get_hidden_password(password, MAX_NAME);
    printf("Confirm password: ");
    get_hidden_password(confirm_password, MAX_NAME);

    if (strcmp(password, confirm_password) != 0) {
        printf("\nPasswords do not match!\n");
        press_any_key_to_continue();
        return;
    }

    simple_hash(password, users[user_count].password_hash);
    users[user_count].is_admin = 0;
    user_count++;
    printf("\nAccount created successfully!\n");
    press_any_key_to_continue();
}

// --- Book Management Functions ---

void add_book() {
    clear_screen();
    if (book_count >= MAX_BOOKS) {
        printf("\nLibrary is full! Cannot add more books.\n");
        press_any_key_to_continue();
        return;
    }

    printf("\n--- Add New Book ---\n");
    struct Book new_book;

    int max_id = 0;
    for (int i = 0; i < book_count; i++) {
        if (books[i].id > max_id) max_id = books[i].id;
    }
    new_book.id = max_id + 1;

    printf("Book ID will be: %d\n", new_book.id);
    printf("Enter book title: ");
    get_safe_input(new_book.title, MAX_TITLE);
    printf("Enter book author: ");
    get_safe_input(new_book.author, MAX_NAME);
    new_book.is_borrowed = 0;
    strcpy(new_book.borrower, "");

    books[book_count++] = new_book;
    printf("\nBook \'%s\' added successfully!\n", new_book.title);
    press_any_key_to_continue();
}

void delete_book() {
    clear_screen();
    printf("\n--- Delete Book ---\n");
    printf("Enter book ID to delete: ");
    char input[10];
    get_safe_input(input, sizeof(input));
    int id = atoi(input);

    for (int i = 0; i < book_count; i++) {
        if (books[i].id == id) {
            if (books[i].is_borrowed) {
                printf("\nCannot delete a book that is currently borrowed.\n");
                press_any_key_to_continue();
                return;
            }
            printf("Book \'%s\' deleted successfully!\n", books[i].title);
            for (int j = i; j < book_count - 1; j++) {
                books[j] = books[j + 1];
            }
            book_count--;
            press_any_key_to_continue();
            return;
        }
    }
    printf("\nBook with ID %d not found!\n", id);
    press_any_key_to_continue();
}

// Helper functions for printing book details
void print_book_header() {
    printf("---------------------------------------------------------------------------------------------------\n");
    printf("| %-4s | %-30s | %-20s | %-10s | %-15s |\n", "ID", "Title", "Author", "Status", "Borrower");
    printf("---------------------------------------------------------------------------------------------------\n");
}

void print_book_details(const struct Book* book) {
    printf("| %-4d | %-30s | %-20s | %-10s | %-15s |\n",
           book->id,
           book->title,
           book->author,
           book->is_borrowed ? "Borrowed" : "Available",
           book->is_borrowed ? book->borrower : "N/A");
}

void search_book() {
    clear_screen();
    char query[MAX_TITLE];
    char lower_query[MAX_TITLE];
    char lower_title[MAX_TITLE];
    char lower_author[MAX_NAME];
    int found = 0;

    printf("\n--- Search Book ---\n");
    printf("Enter title or author keyword: ");
    get_safe_input(query, MAX_TITLE);

    strcpy(lower_query, query);
    to_lower_case(lower_query);

    printf("\n--- Search Results ---\n");
    print_book_header();
    for (int i = 0; i < book_count; i++) {
        strcpy(lower_title, books[i].title);
        to_lower_case(lower_title);
        strcpy(lower_author, books[i].author);
        to_lower_case(lower_author);

        if (strstr(lower_title, lower_query) != NULL || strstr(lower_author, lower_query) != NULL) {
            print_book_details(&books[i]);
            found = 1;
        }
    }
    printf("---------------------------------------------------------------------------------------------------\n");
    if (!found) {
        printf("No books found matching your query.\n");
    }
    press_any_key_to_continue();
}

void borrow_book() {
    clear_screen();
    printf("\n--- Borrow Book ---\n");
    printf("Enter book ID to borrow: ");
    char input[10];
    get_safe_input(input, sizeof(input));
    int id = atoi(input);

    for (int i = 0; i < book_count; i++) {
        if (books[i].id == id) {
            if (books[i].is_borrowed) {
                printf("\nBook is already borrowed by \'%s\'.\n", books[i].borrower);
            } else {
                books[i].is_borrowed = 1;
                strcpy(books[i].borrower, users[current_user_index].username);
                printf("\nBook \'%s\' borrowed successfully!\n", books[i].title);
            }
            press_any_key_to_continue();
            return;
        }
    }
    printf("\nBook with ID %d not found!\n", id);
    press_any_key_to_continue();
}

void return_book() {
    clear_screen();
    printf("\n--- Return Book ---\n");
    printf("Enter book ID to return: ");
    char input[10];
    get_safe_input(input, sizeof(input));
    int id = atoi(input);

    for (int i = 0; i < book_count; i++) {
        if (books[i].id == id) {
            if (books[i].is_borrowed) {
                // Admin can return any book, student can only return their own
                if (users[current_user_index].is_admin || strcmp(books[i].borrower, users[current_user_index].username) == 0) {
                    books[i].is_borrowed = 0;
                    strcpy(books[i].borrower, "");
                    printf("\nBook \'%s\' returned successfully!\n", books[i].title);
                } else {
                    printf("\nError: You did not borrow this book.\n");
                }
            } else {
                printf("\nThis book is not currently borrowed.\n");
            }
            press_any_key_to_continue();
            return;
        }
    }
    printf("\nBook with ID %d not found!\n", id);
    press_any_key_to_continue();
}

void display_library_status() {
    clear_screen();
    printf("\n--- Library Status ---\n");
    int available_count = 0;
    int borrowed_count = 0;

    printf("\n--- Available Books ---\n");
    print_book_header();
    for (int i = 0; i < book_count; i++) {
        if (!books[i].is_borrowed) {
            print_book_details(&books[i]);
            available_count++;
        }
    }
    printf("---------------------------------------------------------------------------------------------------\n");
    if (available_count == 0) printf("No books are currently available.\n");

    printf("\n--- Borrowed Books ---\n");
    print_book_header();
    for (int i = 0; i < book_count; i++) {
        if (books[i].is_borrowed) {
            print_book_details(&books[i]);
            borrowed_count++;
        }
    }
    printf("---------------------------------------------------------------------------------------------------\n");
    if (borrowed_count == 0) printf("No books are currently borrowed.\n");

    press_any_key_to_continue();
}

void display_books_by_status_menu() {
    const char *options[] = {"View All Books", "View My Borrowed Books", "View Available Books", "Back to Student Menu"};
    int num_options = 4;
    int selected = 0;
    int ch;

    while(1) {
        clear_screen();
        printf("\n--- View Books (Filter) ---\n");
        printf("Use UP/DOWN arrows to navigate, ENTER to select.\n\n");

        for (int i = 0; i < num_options; i++) {
            if (i == selected) {
                printf(" > \033[7m%s\033[0m\n", options[i]);
            } else {
                printf("   %s\n", options[i]);
            }
        }

        ch = getch();
        if (ch == 0 || ch == 224) {
            switch (getch()) {
                case 72: if (selected > 0) selected--; else selected = num_options - 1; break;
                case 80: if (selected < num_options - 1) selected++; else selected = 0; break;
            }
        } else if (ch == 13) { // Enter
            if (selected == 3) return; // Back to student menu

            int found = 0;
            clear_screen();
            switch (selected) {
                case 0: // All Books
                    printf("\n--- All Books in Library ---\n");
                    print_book_header();
                    for (int i = 0; i < book_count; i++) {
                        print_book_details(&books[i]);
                        found = 1;
                    }
                    printf("---------------------------------------------------------------------------------------------------\n");
                    if (!found) printf("The library is empty.\n");
                    break;
                case 1: // My Borrowed Books
                    printf("\n--- Books Borrowed by You ---\n");
                    print_book_header();
                    for (int i = 0; i < book_count; i++) {
                        if (books[i].is_borrowed && strcmp(books[i].borrower, users[current_user_index].username) == 0) {
                            print_book_details(&books[i]);
                            found = 1;
                        }
                    }
                    printf("---------------------------------------------------------------------------------------------------\n");
                    if (!found) printf("You have not borrowed any books.\n");
                    break;
                case 2: // Available Books
                    printf("\n--- Available Books ---\n");
                    print_book_header();
                    for (int i = 0; i < book_count; i++) {
                        if (!books[i].is_borrowed) {
                            print_book_details(&books[i]);
                            found = 1;
                        }
                    }
                    printf("---------------------------------------------------------------------------------------------------\n");
                    if (!found) printf("No books are currently available.\n");
                    break;
            }
            press_any_key_to_continue();
        }
    }
}


