import 'package:shared_preferences/shared_preferences.dart';

import '../../domain/Entities/userin.dart';

void saveInfoUser(UserIn user) async {
  final prefs = await SharedPreferences.getInstance();

  prefs.setString("token", user.token);
  prefs.setString("id", user.id);
  prefs.setString("names", user.names);
}
