// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import '../widgets/sign_in_widget.dart';
import '../widgets/sign_up_widget.dart';

class AuthScreen extends StatefulWidget {
  bool mode;

  AuthScreen({super.key, required this.mode});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final GlobalKey<FormState> myFormState = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final palette = Theme.of(context).colorScheme;

    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 60),
        child: Column(
          children: [
            Form(
                key: myFormState,
                child: widget.mode ? const SignInWidget() : const SignUpWidget()),
            SizedBox(
              width: double.infinity,
              child: FilledButton.tonal(
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all(palette.surfaceVariant),
                ),
                onPressed: () {
                  setState(() {
                    widget.mode = !widget.mode;
                  });
                },
                child:
                    Text(widget.mode ? "No tengo cuenta" : "Ya tengo cuenta"),
              ),
            )
          ],
        ),
      ),
    );
  }
}
