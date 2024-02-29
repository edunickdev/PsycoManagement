import 'dart:convert';

import 'package:psyco_admin/domain/Entities/user_entity.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:dio/dio.dart';

import '../../../domain/Entities/userin.dart';

Future loadEnvs() async {
  await dotenv.load(fileName: "assets/.env");
}

final _dio = Dio();

Future<UserIn?> loginAuth(String email, String password) async {
  await loadEnvs();
  final endpointUrl = dotenv.get("BASE_API_URL");
  final requestData = {
    'email': email,
    'password': password,
  };

  try {
    final response = await _dio.post(
      "$endpointUrl/auth/login",
      data: jsonEncode(requestData),
      options: Options(
        headers: {
          'Content-Type': 'application/json',
        },
      ),
    );
    if (response.data != null) {
      UserIn user = userInFromJson(jsonEncode(response.data));
      return user;
    }
    return null;
  } catch (error, stacktrace) {
    print('Error: $error');
    print('Stacktrace: $stacktrace');
    return null;
  }
}
