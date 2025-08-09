#include <iostream>
#include <windows.h>
#include <sql.h>
#include <sqlext.h>
#include <string>
#include <vector>

// دالة لعرض رسائل الخطأ من ODBC
void show_error(unsigned int handletype, const SQLHANDLE& handle) {
    SQLCHAR sqlstate[1024];
    SQLCHAR message[1024];
    if (SQL_SUCCESS == SQLGetDiagRec(handletype, handle, 1, sqlstate, NULL, message, 1024, NULL)) {
        std::cout << "Message: " << message << "\nSQLSTATE: " << sqlstate << std::endl;
    }
}

// دالة للاتصال بقاعدة البيانات
bool connect_db(SQLHENV& env, SQLHDBC& dbc) {
    if (SQL_SUCCESS != SQLAllocHandle(SQL_HANDLE_ENV, SQL_NULL_HANDLE, &env)) {
        std::cerr << "Error allocating environment handle" << std::endl;
        return false;
    }
    if (SQL_SUCCESS != SQLSetEnvAttr(env, SQL_ATTR_ODBC_VERSION, (SQLPOINTER)SQL_OV_ODBC3, 0)) {
        std::cerr << "Error setting environment attribute" << std::endl;
        return false;
    }
    if (SQL_SUCCESS != SQLAllocHandle(SQL_HANDLE_DBC, env, &dbc)) {
        std::cerr << "Error allocating connection handle" << std::endl;
        return false;
    }

    // استخدم DSN الذي قمت بإنشائه
    SQLCHAR* dsn_name = (SQLCHAR*)"PharmacyDB_DSN";
    if (SQL_SUCCESS != SQLConnect(dbc, dsn_name, SQL_NTS, NULL, 0, NULL, 0)) {
        show_error(SQL_HANDLE_DBC, dbc);
        return false;
    }

    std::cout << "Connected to database successfully!" << std::endl;
    return true;
}

// دالة للبحث عن الدواء باستخدام QR Code
void search_by_qr(SQLHDBC& dbc, const std::string& qr_code) {
    SQLHSTMT stmt;
    if (SQL_SUCCESS != SQLAllocHandle(SQL_HANDLE_STMT, dbc, &stmt)) {
        show_error(SQL_HANDLE_DBC, dbc);
        return;
    }

    std::string query = "SELECT brand_name, generic_name, concentration, price, quantity_in_stock, location_in_pharmacy FROM medications WHERE qr_code = ?";
    if (SQL_SUCCESS != SQLPrepare(stmt, (SQLCHAR*)query.c_str(), SQL_NTS)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    if (SQL_SUCCESS != SQLBindParameter(stmt, 1, SQL_PARAM_INPUT, SQL_C_CHAR, SQL_VARCHAR, qr_code.length(), 0, (SQLPOINTER)qr_code.c_str(), 0, NULL)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    if (SQL_SUCCESS != SQLExecute(stmt)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    char brand_name[256], generic_name[256], concentration[256], location[256];
    double price;
    int quantity;

    SQLBindCol(stmt, 1, SQL_C_CHAR, brand_name, 256, NULL);
    SQLBindCol(stmt, 2, SQL_C_CHAR, generic_name, 256, NULL);
    SQLBindCol(stmt, 3, SQL_C_CHAR, concentration, 256, NULL);
    SQLBindCol(stmt, 4, SQL_C_DOUBLE, &price, 0, NULL);
    SQLBindCol(stmt, 5, SQL_C_LONG, &quantity, 0, NULL);
    SQLBindCol(stmt, 6, SQL_C_CHAR, location, 256, NULL);

    if (SQLFetch(stmt) == SQL_SUCCESS) {
        std::cout << "\n--- Medication Details ---" << std::endl;
        std::cout << "Brand Name: " << brand_name << std::endl;
        std::cout << "Generic Name: " << generic_name << std::endl;
        std::cout << "Concentration: " << concentration << std::endl;
        std::cout << "Price: " << price << std::endl;
        std::cout << "Quantity: " << quantity << std::endl;
        std::cout << "Location: " << location << std::endl;
        std::cout << "------------------------\n" << std::endl;
    } else {
        std::cout << "Medication not found." << std::endl;
    }

    SQLFreeHandle(SQL_HANDLE_STMT, stmt);
}

// دالة للبحث عن الأدوية باستخدام الاسم الجزئي
void search_by_partial_name(SQLHDBC& dbc, const std::string& partial_name) {
    SQLHSTMT stmt;
    if (SQL_SUCCESS != SQLAllocHandle(SQL_HANDLE_STMT, dbc, &stmt)) {
        show_error(SQL_HANDLE_DBC, dbc);
        return;
    }

    std::string query = "SELECT brand_name, generic_name, concentration, price, quantity_in_stock, location_in_pharmacy FROM medications WHERE brand_name LIKE ? OR generic_name LIKE ?";
    if (SQL_SUCCESS != SQLPrepare(stmt, (SQLCHAR*)query.c_str(), SQL_NTS)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    std::string search_term = "%" + partial_name + "%";
    if (SQL_SUCCESS != SQLBindParameter(stmt, 1, SQL_PARAM_INPUT, SQL_C_CHAR, SQL_VARCHAR, search_term.length(), 0, (SQLPOINTER)search_term.c_str(), 0, NULL)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }
    if (SQL_SUCCESS != SQLBindParameter(stmt, 2, SQL_PARAM_INPUT, SQL_C_CHAR, SQL_VARCHAR, search_term.length(), 0, (SQLPOINTER)search_term.c_str(), 0, NULL)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    if (SQL_SUCCESS != SQLExecute(stmt)) {
        show_error(SQL_HANDLE_STMT, stmt);
        return;
    }

    char brand_name[256], generic_name[256], concentration[256], location[256];
    double price;
    int quantity;

    SQLBindCol(stmt, 1, SQL_C_CHAR, brand_name, 256, NULL);
    SQLBindCol(stmt, 2, SQL_C_CHAR, generic_name, 256, NULL);
    SQLBindCol(stmt, 3, SQL_C_CHAR, concentration, 256, NULL);
    SQLBindCol(stmt, 4, SQL_C_DOUBLE, &price, 0, NULL);
    SQLBindCol(stmt, 5, SQL_C_LONG, &quantity, 0, NULL);
    SQLBindCol(stmt, 6, SQL_C_CHAR, location, 256, NULL);

    std::cout << "\n--- Search Results ---" << std::endl;
    while (SQLFetch(stmt) == SQL_SUCCESS) {
        std::cout << "Brand Name: " << brand_name << ", Generic Name: " << generic_name << ", Price: " << price << std::endl;
    }
    std::cout << "----------------------\n" << std::endl;

    SQLFreeHandle(SQL_HANDLE_STMT, stmt);
}

int main() {
    SQLHENV env;
    SQLHDBC dbc;

    if (!connect_db(env, dbc)) {
        return 1;
    }

    int choice;
    do {
        std::cout << "\nPharmacy Database Menu:\n";
        std::cout << "1. Search by QR Code\n";
        std::cout << "2. Search by Partial Name\n";
        std::cout << "3. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        if (choice == 1) {
            std::string qr_code;
            std::cout << "Enter QR Code: ";
            std::cin >> qr_code;
            search_by_qr(dbc, qr_code);
        } else if (choice == 2) {
            std::string partial_name;
            std::cout << "Enter Partial Name: ";
            std::cin >> partial_name;
            search_by_partial_name(dbc, partial_name);
        }
    } while (choice != 3);

    SQLDisconnect(dbc);
    SQLFreeHandle(SQL_HANDLE_DBC, dbc);
    SQLFreeHandle(SQL_HANDLE_ENV, env);

    return 0;
}


