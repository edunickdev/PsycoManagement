// To parse this JSON data, do
//
//     final therapist = therapistFromJson(jsonString);

import 'dart:convert';

Therapist therapistFromJson(String str) => Therapist.fromJson(json.decode(str));

String therapistToJson(Therapist data) => json.encode(data.toJson());

class Therapist {
  final String registerDate;
  final String names;
  final String genre;
  final String birthDate;
  final int age;
  final String email;
  final String password;
  final String phone;
  final String address;
  final String typeDocument;
  final int documentNumber;
  final String status;

  Therapist({
    this.registerDate = "",
    required this.names,
    this.genre = "",
    this.birthDate = "",
    this.age = 0,
    required this.email,
    required this.password,
    this.phone = "",
    this.address = "",
    this.typeDocument = "",
    this.documentNumber = 0,
    this.status = "",
  });

  factory Therapist.fromJson(Map<String, dynamic> json) => Therapist(
        registerDate: json["register_date"],
        names: json["names"],
        genre: json["genre"],
        birthDate: json["birth_date"],
        age: json["age"],
        email: json["email"],
        password: json["password"],
        phone: json["phone"],
        address: json["address"],
        typeDocument: json["type_document"],
        documentNumber: json["document_number"],
        status: json["status"],
      );

  Map<String, dynamic> toJson() => {
        "register_date": registerDate,
        "names": names,
        "genre": genre,
        "birth_date": birthDate,
        "age": age,
        "email": email,
        "password": password,
        "phone": phone,
        "address": address,
        "type_document": typeDocument,
        "document_number": documentNumber,
        "status": status,
      };
}
