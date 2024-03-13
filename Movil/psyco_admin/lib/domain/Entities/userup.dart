// To parse this JSON data, do
//
//     final userUp = userUpFromJson(jsonString);

import 'dart:convert';

UserUp userUpFromJson(String str) => UserUp.fromJson(json.decode(str));

String userUpToJson(UserUp data) => json.encode(data.toJson());

class UserUp {
  final String message;
  final String status;

  UserUp({
    required this.message,
    required this.status,
  });

  factory UserUp.fromJson(Map<String, dynamic> json) => UserUp(
        message: json["message"],
        status: json["status"],
      );

  Map<String, dynamic> toJson() => {
        "message": message,
        "status": status,
      };
}
