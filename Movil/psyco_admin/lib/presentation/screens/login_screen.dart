import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/providers.dart';
import '../widgets/sign_in_widget.dart';
import '../widgets/sign_up_widget.dart';

class AuthScreen extends ConsumerWidget {
  static const name = "auth";

  const AuthScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final mode = ref.watch(modeAuthProvider);
    final palette = Theme.of(context).colorScheme;
    final formValidations = GlobalKey<FormState>();

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Container(
            decoration: BoxDecoration(
              color: palette.onSecondary,
              image: const DecorationImage(
                image: AssetImage("assets/images/fondoLogin.png"),
                fit: BoxFit.cover,
                opacity: 0.2,
              ),
            ),
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 40, vertical: 170),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Form(
                    key: formValidations,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    child: mode
                        ? SignInWidget(formKey: formValidations)
                        : SignUpWidget(formKey: formValidations),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
