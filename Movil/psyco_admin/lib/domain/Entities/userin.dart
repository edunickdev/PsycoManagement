// To parse this JSON data, do
//
//     final userIn = userInFromJson(jsonString);

import 'dart:convert';

UserIn userInFromJson(String str) => UserIn.fromJson(json.decode(str));

String userInToJson(UserIn data) => json.encode(data.toJson());

class UserIn {
  final String message;
  final String status;
  final String token;
  final String id;
  final String names;

  UserIn({
    required this.message,
    required this.status,
    required this.token,
    required this.id,
    required this.names,
  });

  factory UserIn.fromJson(Map<String, dynamic> json) => UserIn(
        message: json["message"],
        status: json["status"],
        token: json["token"],
        id: json["id"],
        names: json["names"],
      );

  Map<String, dynamic> toJson() => {
        "message": message,
        "status": status,
        "token": token,
        "id": id,
        "names": names,
      };
}
