# Content Documentation

This file contains all user-facing text content organized by screen/component with unique identifiers for easy updates.

---

## ONBOARDING SCREEN

**Note**: The onboarding now uses a carousel with autoplay (5 seconds per slide) and email/OTP verification below the carousel. The sign-up form slide has been removed.

### Email/OTP Verification
- **ID**: `onboarding_email_label`
- **Content**: "Email Address"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_email_placeholder`
- **Content**: "Enter your email"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_send_otp_button`
- **Content**: "Send OTP"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_sending_otp`
- **Content**: "Sending..."
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_otp_title`
- **Content**: "Almost there!"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_otp_instruction`
- **Content**: "Check your email inbox on your phone and tap the verification link to verify your account."
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_otp_label`
- **Content**: "Enter verification code"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_otp_sent_to`
- **Content**: "Sent to: {email}"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_verify_button`
- **Content**: "Verify"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_verifying`
- **Content**: "Verifying..."
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_edit_email`
- **Content**: "Edit email"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_resend_code`
- **Content**: "Resend code"
- **Location**: `src/components/EmailOTP.tsx`

- **ID**: `onboarding_resend_cooldown`
- **Content**: "Resend code ({resendCooldown}s)"
- **Location**: `src/components/EmailOTP.tsx`

### Slide 1: Welcome
- **ID**: `onboarding_slide1_title`
- **Content**: "Your Voice Shapes What America Watches"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide1_description`
- **Content**: "Join thousands of households making an impact on the future of entertainment."
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide1_cta`
- **Content**: "Get Started"
- **Location**: `src/pages/OnboardingPage.tsx`

### Slide 2: Trust & Privacy
- **ID**: `onboarding_slide2_title`
- **Content**: "Your Privacy is Our Priority"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide2_description`
- **Content**: "We use bank-level encryption to keep your data 100% secure and confidential."
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide2_feature1`
- **Content**: "Bank-level encryption"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide2_feature2`
- **Content**: "Never sell your personal data"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide2_feature3`
- **Content**: "100% secure & confidential"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide2_cta`
- **Content**: "Continue"
- **Location**: `src/pages/OnboardingPage.tsx`

### Slide 3: Impact
- **ID**: `onboarding_slide3_title`
- **Content**: "Join 40,000+ Households"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_description`
- **Content**: "Be part of a community that has shaped media for over 95 years."
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_stat1_title`
- **Content**: "95+ Years"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_stat1_desc`
- **Content**: "Of trusted research history"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_stat2_title`
- **Content**: "Real Influence"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_stat2_desc`
- **Content**: "Decide what shows get renewed"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide3_cta`
- **Content**: "Next"
- **Location**: `src/pages/OnboardingPage.tsx`

### Slide 4: Rewards
- **ID**: `onboarding_slide4_title`
- **Content**: "Get Rewarded for Your Time"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_description`
- **Content**: "Earn monthly rewards and exclusive perks just for participating."
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_reward_label`
- **Content**: "Earn up to"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_reward_amount`
- **Content**: "$60"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_reward_period`
- **Content**: "per month in rewards"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_feature1`
- **Content**: "Easy setup"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_feature2`
- **Content**: "Exclusive perks"
- **Location**: `src/pages/OnboardingPage.tsx`

- **ID**: `onboarding_slide4_cta`
- **Content**: "Sign Me Up"
- **Location**: `src/pages/OnboardingPage.tsx` (Note: CTA buttons removed, carousel autoplays)

---

## WELCOME SCREEN

- **ID**: `welcome_title`
- **Content**: "Welcome to the Nielsen Family"
- **Location**: `src/components/WelcomeScreen.tsx`

- **ID**: `welcome_description`
- **Content**: "You're helping shape what America watches. Thank you for being part of something bigger."
- **Location**: `src/components/WelcomeScreen.tsx`

- **ID**: `welcome_privacy_title`
- **Content**: "Privacy First"
- **Location**: `src/components/WelcomeScreen.tsx`

- **ID**: `welcome_privacy_description`
- **Content**: "Your privacy matters. We measure what you watch, not who you are. All data is aggregated and anonymized."
- **Location**: `src/components/WelcomeScreen.tsx`

- **ID**: `welcome_cta`
- **Content**: "Let's get started"
- **Location**: `src/components/WelcomeScreen.tsx`

---

## HOME PAGE

### Hero Carousel Slides
- **ID**: `hero_carousel_slide1_badge`
- **Content**: "Your Impact"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide1_title`
- **Content**: "Your Voice Shapes the Future of TV"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide1_description`
- **Content**: "What you watch influences what gets made. You're part of a select group representing millions of viewers across America."
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide2_badge`
- **Content**: "Representing Millions"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide2_title`
- **Content**: "You Speak for Your Community"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide2_description`
- **Content**: "Your household represents thousands of similar families. Networks and advertisers rely on your viewing habits to make billion-dollar decisions."
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide3_badge`
- **Content**: "Real Influence"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide3_title`
- **Content**: "What You Watch Matters"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide3_description`
- **Content**: "Your viewing data helps determine which shows get renewed, which ads you see, and what content creators make next."
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide4_badge`
- **Content**: "Trusted Legacy"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide4_title`
- **Content**: "100+ Years of Measuring Media"
- **Location**: `src/components/HeroCarousel.tsx`

- **ID**: `hero_carousel_slide4_description`
- **Content**: "Since 1923, Nielsen has been the gold standard in audience measurement. You're joining a trusted tradition of shaping entertainment."
- **Location**: `src/components/HeroCarousel.tsx`

### Progress-Based Hero (In Progress)
- **ID**: `progress_hero_inprogress_badge`
- **Content**: "{progressPercent}% Complete"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_inprogress_title`
- **Content**: "You're Doing Great! Keep Going 💪"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_inprogress_description`
- **Content**: "Pick up where you left off. Let's finish this before your calibration call—you're almost there!"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_inprogress_stats`
- **Content**: "{progress} of {totalRequired} tasks complete"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_inprogress_remaining`
- **Content**: "{totalRequired - progress} remaining"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_inprogress_cta`
- **Content**: "Continue Setup"
- **Location**: `src/components/ProgressBasedHero.tsx`

### Progress-Based Hero (Complete)
- **ID**: `progress_hero_complete_badge`
- **Content**: "Setup Complete!"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_complete_title`
- **Content**: "Amazing Work! 🎉"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_complete_description`
- **Content**: "Your Nielsen rep respects your effort and can't wait to talk with you during your calibration call. You're all set for the next step!"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_complete_next_title`
- **Content**: "What's Next?"
- **Location**: `src/components/ProgressBasedHero.tsx`

- **ID**: `progress_hero_complete_next_description`
- **Content**: "Your Nielsen specialist will call you soon to verify everything is working perfectly."
- **Location**: `src/components/ProgressBasedHero.tsx`

### Why Nielsen Section
- **ID**: `home_why_nielsen_title`
- **Content**: "Why Nielsen?"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_description`
- **Content**: "100+ years trusted by networks and 42K+ households. Your viewing shapes entertainment."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat1_value`
- **Content**: "100+"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat1_label`
- **Content**: "Years"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat2_value`
- **Content**: "42K+"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat2_label`
- **Content**: "Households"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat3_value`
- **Content**: "100%"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat3_label`
- **Content**: "Private"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat4_value`
- **Content**: "$$$"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_why_nielsen_stat4_label`
- **Content**: "Rewards"
- **Location**: `src/components/CompactHomeSections.tsx`

### How It Works Section
- **ID**: `home_how_it_works_title`
- **Content**: "How It Works"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_description`
- **Content**: "Simple, secure, and completely private"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_video_text`
- **Content**: "Watch how your data flows securely from home to Nielsen"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_summary`
- **Content**: "Collect → Encrypt → Anonymize"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_title`
- **Content**: "How Your Nielsen System Works"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step1_title`
- **Content**: "Step 1: Data Collection"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step1_description`
- **Content**: "Your Nielsen meters work quietly in the background to understand what you're watching."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step1_nano`
- **Content**: "Nano Meter: Listens for audio codes embedded in TV programs (like a digital fingerprint). No cameras, no recording—just audio signatures."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step1_streaming`
- **Content**: "Streaming Meter: Tracks what's streamed to your devices. It only sees titles and timestamps—never your passwords or personal browsing."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step2_title`
- **Content**: "Step 2: Secure Transmission"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step2_description`
- **Content**: "The Hub sends all data through an encrypted connection—like a secure tunnel that no one can see inside."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step2_encryption`
- **Content**: "Bank-level 256-bit encryption protects your data"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step3_title`
- **Content**: "Step 3: Anonymization"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step3_description`
- **Content**: "Before any analysis, your personal details are completely removed. We only keep anonymous viewing patterns."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step3_keep`
- **Content**: "✓ What We Keep: Show titles, timestamps, household demographics"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_step3_remove`
- **Content**: "✗ What We Remove: Names, addresses, personal identifiers"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_how_it_works_modal_close`
- **Content**: "Got it, close"
- **Location**: `src/components/CompactHomeSections.tsx`

### What to Expect Section
- **ID**: `home_what_to_expect_title`
- **Content**: "What to Expect"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop1_title`
- **Content**: "Today"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop1_time`
- **Content**: "~30 min"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop1_description`
- **Content**: "Complete equipment setup with our step-by-step guide"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop2_title`
- **Content**: "Next: [Date]"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop2_badge`
- **Content**: "Call"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop2_description`
- **Content**: "Your Nielsen rep calls to calibrate and verify meters are reading correctly"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop3_title`
- **Content**: "You're Live!"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop3_badge`
- **Content**: "Ongoing"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_stop3_description`
- **Content**: "Watch TV normally, press your remote button, and earn monthly rewards"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_impact_title`
- **Content**: "Your Impact"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_what_to_expect_impact_description`
- **Content**: "Your viewing data contributes to Nielsen's national TV ratings, helping shape the future of entertainment."
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_sticky_cta_time`
- **Content**: "~30 min"
- **Location**: `src/components/CompactHomeSections.tsx`

- **ID**: `home_sticky_cta_button`
- **Content**: "Let's Get Started"
- **Location**: `src/components/CompactHomeSections.tsx`

### Personal Specialist Section
- **ID**: `home_specialist_title`
- **Content**: "Your Personal Specialist"
- **Location**: `src/pages/HomePage.tsx`

### PRS Profile
- **ID**: `prs_name`
- **Content**: "Sarah Mitchell"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_role`
- **Content**: "Your Nielsen Specialist • {yearsAtNielsen} years with Nielsen"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_fun_fact`
- **Content**: "Loves 90s sitcoms and has seen every episode of Friends twice!"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_call_date_label`
- **Content**: "Scheduled Call"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_call_date`
- **Content**: "Thursday, Jan 25"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_call_time_label`
- **Content**: "Time Window"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_call_time`
- **Content**: "2:00 PM - 3:00 PM"
- **Location**: `src/components/PRSProfile.tsx`

- **ID**: `prs_message`
- **Content**: "You're in good hands. {name} will walk you through the final WiFi setup and calibration. It usually takes about 15 minutes."
- **Location**: `src/components/PRSProfile.tsx`

### Reward Card
- **ID**: `reward_card_title`
- **Content**: "Early-Bird Reward"
- **Location**: `src/components/RewardCard.tsx`

- **ID**: `reward_card_hidden`
- **Content**: "Tap to unlock your thank you gift"
- **Location**: `src/components/RewardCard.tsx`

- **ID**: `reward_card_revealed`
- **Content**: "Your $25 gift card is ready!"
- **Location**: `src/components/RewardCard.tsx`

- **ID**: `reward_card_amount`
- **Content**: "$25"
- **Location**: `src/components/RewardCard.tsx`

- **ID**: `reward_card_description`
- **Content**: "Because you're taking the lead on setup, we've unlocked a $25 gift card for you. It'll be ready as soon as we complete the installation call!"
- **Location**: `src/components/RewardCard.tsx`

---

## HOW IT WORKS SCREEN

- **ID**: `how_it_works_title`
- **Content**: "How the magic happens"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_description`
- **Content**: "Understanding your equipment helps you set it up correctly."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_nano_title`
- **Content**: "Nano Meter"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_nano_desc`
- **Content**: "Listens for special audio codes in TV programs to know what's playing."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_power_title`
- **Content**: "Power Sensor"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_power_desc`
- **Content**: "Simply tells us if the TV is On or Off."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_remote_title`
- **Content**: "People Remote"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_remote_desc`
- **Content**: "You use this to tell us who in the family is watching."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_hub_title`
- **Content**: "The Hub"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_hub_desc`
- **Content**: "A backup cellular connection to send data if your WiFi goes down."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_streaming_title`
- **Content**: "Streaming Meter"
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_streaming_desc`
- **Content**: "Measures online content streamed to your TV."
- **Location**: `src/components/HowItWorks.tsx`

- **ID**: `how_it_works_cta`
- **Content**: "I understand, let's setup"
- **Location**: `src/components/HowItWorks.tsx`

---

## WHAT TO EXPECT SCREEN

- **ID**: `what_to_expect_title`
- **Content**: "What to Expect"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_description`
- **Content**: "Here's your journey from setup to becoming an active Nielsen household"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_today_title`
- **Content**: "Today: Setup (~30 minutes)"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_today_description`
- **Content**: "Install your equipment following simple step-by-step instructions. We'll guide you through placing each device."
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_today_tag1`
- **Content**: "Living Room TV"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_today_tag2`
- **Content**: "Hub Connection"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_today_tag3`
- **Content**: "Streaming Meter"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_week1_title`
- **Content**: "Week 1: You're Live!"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_week1_description`
- **Content**: "Your equipment starts collecting viewing data automatically. Just watch TV as you normally would and use the People Meter remote to log who's watching."
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_week1_tip`
- **Content**: "💡 Tip: Press your button on the remote when you start watching. That's it!"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_ongoing_title`
- **Content**: "Ongoing: Earn Rewards"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_ongoing_description`
- **Content**: "Keep your equipment running and use your remote. We'll send monthly incentives and occasional surveys to learn more about your viewing preferences."
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_ongoing_rewards`
- **Content**: "Monthly rewards + bonus opportunities"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_responsibilities_title`
- **Content**: "Your Simple Responsibilities"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_responsibility1`
- **Content**: "Keep equipment plugged in and powered on"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_responsibility2`
- **Content**: "Press your button on the People Meter remote when watching TV"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_responsibility3`
- **Content**: "Respond to occasional surveys (2-3 per month)"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_responsibility4`
- **Content**: "Contact us if you have any technical issues"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_cta`
- **Content**: "Ready? Let's Set Up Your Equipment"
- **Location**: `src/components/WhatToExpect.tsx`

- **ID**: `what_to_expect_cta_note`
- **Content**: "Takes about 30 minutes • You can pause and resume anytime"
- **Location**: `src/components/WhatToExpect.tsx`

---

## EQUIPMENT OVERVIEW

- **ID**: `equipment_intro`
- **Content**: "Your equipment is organized by room. Each box is clearly labeled so you know exactly where each piece goes."
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_living_room_label`
- **Content**: "Living Room Box"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_living_room_badge`
- **Content**: "Required"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_nano_name`
- **Content**: "Nano Meter"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_nano_desc`
- **Content**: "Detects audio"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_remote_name`
- **Content**: "Remote"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_remote_desc`
- **Content**: "Who's watching"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_power_name`
- **Content**: "Power Sensor"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_power_desc`
- **Content**: "TV on/off detection"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_bedroom_label`
- **Content**: "Bedroom Box"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_bedroom_badge`
- **Content**: "Optional"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_central_label`
- **Content**: "Central Devices"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_hub_name`
- **Content**: "The Hub"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_hub_desc`
- **Content**: "Backup connection"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_streaming_name`
- **Content**: "Streaming Meter"
- **Location**: `src/components/EquipmentOverview.tsx`

- **ID**: `equipment_streaming_desc`
- **Content**: "WiFi router"
- **Location**: `src/components/EquipmentOverview.tsx`

---

## SETUP GUIDE

### Setup Journey Header
- **ID**: `setup_journey_title`
- **Content**: "Your Setup Tasks"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_time_badge`
- **Content**: "~30 min"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_subtitle`
- **Content**: "Complete these milestones to finish Phase 1."
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_progress_text`
- **Content**: "{completedRequiredCount} of {requiredCount} required tasks complete"
- **Location**: `src/pages/SetupGuide.tsx`

### Setup Journey Intro Card
- **ID**: `setup_journey_intro_title`
- **Content**: "Let's Get You Set Up"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_intro_card_title`
- **Content**: "You should receive a shipment from Nielsen"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_intro_card_description`
- **Content**: "Unbox it and follow along with the simple steps below. It's easy—you've got this! 💪"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_intro_card_time`
- **Content**: "Each task takes just a few minutes"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_equipment_card_title`
- **Content**: "What's in Your Box"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_journey_equipment_card_description`
- **Content**: "Peek inside to see what you should have received"
- **Location**: `src/pages/SetupGuide.tsx`

### Task Status Labels
- **ID**: `setup_task_recheck_badge`
- **Content**: "Requires Recheck"
- **Location**: `src/components/SetupJourney.tsx`

- **ID**: `setup_task_recheck_subtitle`
- **Content**: "Incomplete - Requires Recheck"
- **Location**: `src/components/SetupJourney.tsx`

- **ID**: `setup_task_nudge_message`
- **Content**: "Please complete \"{nextTask.title}\" first"
- **Location**: `src/components/SetupJourney.tsx`

### Setup Step Modal
- **ID**: `setup_step_verification_title`
- **Content**: "Verify Your Setup"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_step_verification_description`
- **Content**: "Take a moment to verify that everything looks correct. Compare your setup with the image below to ensure everything is properly connected and positioned."
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_step_next_button`
- **Content**: "Next"
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_done_button`
- **Content**: "Mark as Done"
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_completed_message`
- **Content**: "You've already completed this task! Great job! 🎉"
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_exit_dialog_title`
- **Content**: "Short on time?"
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_exit_dialog_message`
- **Content**: "Your progress is saved. You can come back and continue anytime."
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_exit_dialog_later`
- **Content**: "Yes, I'll do this later"
- **Location**: `src/components/SetupStep.tsx`

- **ID**: `setup_step_exit_dialog_continue`
- **Content**: "No, I can continue"
- **Location**: `src/components/SetupStep.tsx`

### Task Completion Celebration
- **ID**: `setup_completion_celebration_title`
- **Content**: "{completedMilestoneName} Complete!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_celebration_message`
- **Content**: "Great work! 🎉"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_loading_next_title`
- **Content**: "Next Task"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_loading_all_done_title`
- **Content**: "🎉 Congratulations! 🎉"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_loading_all_done_message`
- **Content**: "You've completed all setup tasks!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_loading_all_done_submessage`
- **Content**: "Your setup is now complete. Thank you for your patience and attention to detail!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `setup_completion_loading_breather_button`
- **Content**: "Let me catch a breather"
- **Location**: `src/pages/SetupGuide.tsx`

### Appreciation Phrases (Rotating)
- **ID**: `appreciation_phrase1`
- **Content**: "You are doing amazing!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase2`
- **Content**: "Keep up the fantastic work!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase3`
- **Content**: "You're making great progress!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase4`
- **Content**: "You're on a roll!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase5`
- **Content**: "You've got this!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase6`
- **Content**: "You're crushing it!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase7`
- **Content**: "Way to go!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase8`
- **Content**: "You're doing great!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase9`
- **Content**: "Keep it up!"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_phrase10`
- **Content**: "You're unstoppable!"
- **Location**: `src/pages/SetupGuide.tsx`

### Appreciation Message
- **ID**: `appreciation_message_title`
- **Content**: "Thank you for all your effort! 🙏"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `appreciation_message_description`
- **Content**: "We really appreciate the time and care you've put into this. Sarah will help you get everything sorted during the call."
- **Location**: `src/pages/SetupGuide.tsx`

---

## VALIDATE SETUP STEP

- **ID**: `validate_setup_title`
- **Content**: "Validate Setup"
- **Location**: `src/components/ValidateSetupStep.tsx`

- **ID**: `validate_setup_step_title`
- **Content**: "Validate Your Setup"
- **Location**: `src/components/ValidateSetupStep.tsx`

- **ID**: `validate_setup_description1`
- **Content**: "This step will verify that all your meters are properly set up and working correctly. We'll check each component to ensure everything is connected and functioning as expected."
- **Location**: `src/components/ValidateSetupStep.tsx`

- **ID**: `validate_setup_description2`
- **Content**: "This process takes about 30 seconds. Once complete, you'll see a summary of your setup status."
- **Location**: `src/components/ValidateSetupStep.tsx`

- **ID**: `validate_setup_button`
- **Content**: "Start Checks"
- **Location**: `src/components/ValidateSetupStep.tsx`

---

## EVALUATION SCREEN

### Checking State
- **ID**: `evaluation_checking_title`
- **Content**: "Checking Your Setup"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_checking_time`
- **Content**: "This might take about 30 seconds"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_checking_description`
- **Content**: "We're verifying that everything is working properly. Don't worry, we're always here to help!"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_checking_progress`
- **Content**: "{currentSystemIndex + 1} of {systemsToCheck.length} systems checked"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_checking_system_verified`
- **Content**: "✓ Verified"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_checking_system_checking`
- **Content**: "Checking..."
- **Location**: `src/components/EvaluationScreen.tsx`

### Success Result
- **ID**: `evaluation_success_title`
- **Content**: "Everything is Complete! 🎉"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_success_subtitle`
- **Content**: "Congratulations!"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_success_message`
- **Content**: "All your meters are properly set up and working correctly. You're all set!"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_success_button`
- **Content**: "Continue"
- **Location**: `src/components/EvaluationScreen.tsx`

### Partial Success Result
- **ID**: `evaluation_partial_title`
- **Content**: "You've Done All the Hard Work! 🎉"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_partial_subtitle`
- **Content**: "Let's do a quick check"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_partial_message`
- **Content**: "You've put in so much effort - amazing work! Sometimes hardware just decides not to play along. Let's do a quick check on a few things."
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_partial_tasks_header`
- **Content**: "The following {recheckTasks.length} {recheckTasks.length === 1 ? 'task needs' : 'tasks need'} to be rechecked:"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_partial_instruction`
- **Content**: "Please review these tasks and then rerun the validation again."
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_partial_button`
- **Content**: "See tasks to check"
- **Location**: `src/components/EvaluationScreen.tsx`

### No Success Result
- **ID**: `evaluation_no_success_title`
- **Content**: "You've Done All the Hard Work! 🎉"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_no_success_subtitle`
- **Content**: "Let's do a quick check"
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_no_success_message`
- **Content**: "You've put in so much effort - amazing work! Sometimes hardware just decides not to play along. Let's do a quick check on everything."
- **Location**: `src/components/EvaluationScreen.tsx`

- **ID**: `evaluation_no_success_button`
- **Content**: "See tasks to check"
- **Location**: `src/components/EvaluationScreen.tsx`

---

## RECHECK STEP

- **ID**: `recheck_header_title`
- **Content**: "Quick Recheck"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_progress_text`
- **Content**: "Task {currentIndex + 1} of {totalTasks}"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_encouragement`
- **Content**: "You've done all the hard work! 💪 Sometimes hardware just decides not to play along - let's do a quick check."
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_message1`
- **Content**: "Check if your setup looks like this and the power is on as it should be"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_message2`
- **Content**: "Take a quick look - does everything match this setup and are the lights/power indicators on?"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_message3`
- **Content**: "Quick check: Does your setup match this image and are all power indicators showing?"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_message4`
- **Content**: "Just verify your setup looks like this and all the power connections are active"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_message5`
- **Content**: "Double-check: Does your setup match this and are the power indicators on?"
- **Location**: `src/components/RecheckStep.tsx`

- **ID**: `recheck_button`
- **Content**: "Yes, looks alright now!"
- **Location**: `src/components/RecheckStep.tsx`

---

## RECHECK CONFIRM STEP

- **ID**: `recheck_confirm_button`
- **Content**: "Mark Verified"
- **Location**: `src/components/RecheckConfirmStep.tsx`

---

## FINAL SUPPORT SCREEN

- **ID**: `final_support_title`
- **Content**: "Don't worry, you've done more than we could ask for! 🙌"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `final_support_message`
- **Content**: "Sometimes technology needs a little extra help, and that's completely okay. We're here to support you every step of the way."
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `final_support_button1`
- **Content**: "I will give this another try"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `final_support_button2`
- **Content**: "Let me get back to this later"
- **Location**: `src/pages/SetupGuide.tsx`

---

## EQUIPMENT MODAL

- **ID**: `equipment_modal_title`
- **Content**: "What's in the Box?"
- **Location**: `src/pages/SetupGuide.tsx`

- **ID**: `equipment_modal_close`
- **Content**: "Got it, close"
- **Location**: `src/pages/SetupGuide.tsx`

---

## BOTTOM NAVIGATION

- **ID**: `nav_home`
- **Content**: "Home"
- **Location**: `src/components/BottomNav.tsx`

- **ID**: `nav_setup`
- **Content**: "Setup"
- **Location**: `src/components/BottomNav.tsx`

- **ID**: `nav_profile`
- **Content**: "Profile"
- **Location**: `src/components/BottomNav.tsx`

- **ID**: `nav_help`
- **Content**: "Help"
- **Location**: `src/components/BottomNav.tsx`

---

## APP HEADER

- **ID**: `app_header_brand`
- **Content**: "Nielsen"
- **Location**: `src/App.tsx`

---

## SETUP TASKS CONFIG

All task titles, descriptions, and tips are defined in:
- **Location**: `src/config/setupTasks.json`

The following tasks are configured:
- Living Room Setup (with steps: box, nano-place, power-sensor, remote)
- The Hub (with steps: hub-place, hub-plug)
- Streaming Meter (with steps: stream-place, stream-connect, stream-power)
- Bedroom TV (with steps: bed-box, bed-nano)

Each task has:
- `id`: Unique identifier
- `title`: Task title
- `description`: Task description
- `subtitle`: Task subtitle
- `steps`: Array of step objects with:
  - `id`: Step identifier
  - `title`: Step title
  - `description`: Step description
  - `illustrationType`: Type of illustration
  - `tip`: Optional tip text

---

## NOTES

- All content IDs follow the pattern: `{screen/component}_{element}_{identifier}`
- Dynamic content uses placeholders like `{variable}` which should be replaced with actual values
- Some content is conditionally displayed based on user state
- Appreciation messages rotate through a list of phrases
- Recheck messages rotate through a list of variations

