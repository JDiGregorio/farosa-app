@extends('layouts.app')

@section('title', 'Inmodata')

@section('content')
    <div id="forgot-password"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/forgotPassword.js') }}"></script>
@endpush