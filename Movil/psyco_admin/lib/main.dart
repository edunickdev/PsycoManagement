import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';

import 'package:psyco_admin/config/router/app_router.dart';
import 'package:psyco_admin/config/theme/custom_theme.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: appRouter,
      theme: CustomTheme(selectedColor: 2).myTheme(),
      debugShowCheckedModeBanner: false,
    );
  }
}
